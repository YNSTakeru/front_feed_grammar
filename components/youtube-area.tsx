/* eslint-disable */

import { errorHandler } from "@/lib/async"
import {
    saveIsRestartStore,
    setIsLoadedStore,
    useIsLoadedStore,
    useIsRestartStore,
    useIsSolvedStore,
} from "@/store"
import { Video } from "@/types/database/tables"
import { useEffect, useLayoutEffect, useState } from "react"
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube"
import { styled } from "styled-components"

function CustomYouTube({
    videoId,
    onReady,
    onStateChange,
    opts,
    ...props
}: YouTubeProps) {
    return (
        <YouTube
            videoId={videoId}
            onReady={onReady}
            onStateChange={onStateChange}
            opts={opts}
            {...props}
        />
    )
}
const SYouTube = styled(CustomYouTube)`
    min-height: 396px;
`

export default function YouTubeArea({
    video,
    width,
}: {
    video: Video
    width: number
}) {
    const [opts, setOpts] = useState({
        height: "390",
        width: "0",
        playerVars: {
            autoplay: 1 as 1,
            mute: 1 as 1,
            controls: 0 as 0,
            disablekb: 1 as 1,
        },
    })

    const [currentTime, setCurrentTime] = useState(0)

    const [event, setEvent] = useState<YouTubeEvent<number> | null>(null)

    const { isLoaded } = useIsLoadedStore()
    const { isSolved } = useIsSolvedStore()
    const { isRestartStore } = useIsRestartStore()

    useLayoutEffect(() => {
        setOpts(prev => ({
            height: "390",
            width: `${width}`,
            playerVars: {
                autoplay: 1 as 1,
                mute: 1 as 1,
                controls: 0 as 0,
                disablekb: 1 as 1,
            },
        }))
        window.addEventListener("resize", () => {
            setOpts(prev => ({
                height: "390",
                width: `${window.innerWidth * 0.5 - 15}`,
                playerVars: {
                    autoplay: 1 as 1,
                    mute: 1 as 1,
                    controls: 0 as 0,
                    disablekb: 1 as 1,
                },
            }))
        })
    }, [])

    useEffect(() => {
        const progressPercent = -(
            100 -
            ((currentTime - +video.start_time) /
                (+video.end_time - +video.start_time)) *
                100
        )

        const $progressBar = document.querySelector(
            ".progress__bar .before",
        ) as HTMLDivElement
        if (!$progressBar) return
        $progressBar.style.transform = `translateX(${progressPercent}%)`
    }, [currentTime])

    useEffect(() => {
        if (isSolved) event?.target.pauseVideo()
    }, [isSolved])

    useEffect(() => {
        if (isRestartStore) {
            event?.target.seekTo(+video.start_time, true)
            event?.target.playVideo()
            saveIsRestartStore(false)
        }
    }, [isRestartStore])

    useEffect(() => {
        setIsLoadedStore(false)
    }, [])

    const onPlayerReady: YouTubeProps["onReady"] = event => {
        event.target.seekTo(+video.start_time, true)
        event.target.playVideo()
    }

    const onStateChange: YouTubeProps["onStateChange"] = event => {
        if (event.data === YouTube.PlayerState.PLAYING) {
            setEvent(prev => event)
            event.target.unMute()
            repeatVideo({ event, video })
        }
    }

    function repeatVideo({
        event,
        video,
    }: {
        event: YouTubeEvent<number>
        video: Video
    }) {
        let timerId = setInterval(() => {
            ;(async () => {
                try {
                    const newCurrentTime = await event.target.getCurrentTime()

                    setCurrentTime(prev => newCurrentTime)

                    if (
                        newCurrentTime < +video.start_time &&
                        (await !event.target.isMuted())
                    ) {
                        await event.target.mute()
                    }
                    if (
                        newCurrentTime >= +video.start_time &&
                        (await event.target.isMuted())
                    ) {
                        await event.target.unMute()
                    }

                    if (newCurrentTime >= +video.end_time) {
                        clearInterval(timerId)
                        await event.target.pauseVideo()

                        const jumpTime =
                            +video.start_time > 1
                                ? +video.start_time - 1
                                : +video.start_time

                        await event.target.seekTo(jumpTime, true)
                        await event.target.mute()

                        if (!isLoaded) setIsLoadedStore(true)

                        await setTimeout(async () => {
                            try {
                                await event.target.playVideo()
                            } catch (error) {
                                errorHandler(error)
                            }
                        }, 1000)
                    }
                } catch (error) {
                    errorHandler(error)
                    clearInterval(timerId)
                }
            })()
        }, 1)
    }

    return (
        <SYouTube
            videoId={video.url}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
            opts={opts}
        />
    )
}
