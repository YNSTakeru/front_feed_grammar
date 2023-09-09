'use client'
import { errorHandler } from '@/lib/async'
import axios from '@/lib/axios'
import { activateSubmitBtn, onBlurHandler } from '@/lib/form-validate'
import { setTokenToCookie } from '@/lib/setData'
import Theme from '@/themes/light'
import { useRouter } from 'next/navigation'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ThemeProvider, styled } from 'styled-components'
import Spinner from './spinner'

export type FormValues = {
    name: string
    email: string
    contact: string
    answer: string
    agree: string
    recaptchaToken: string
}

const SMain = styled.main`
    background-color: #eaf6ea;
`

const SSectionInner = styled.div`
    background-color: ${({ theme }) => theme.asideBackgroundColor};
    height: 10vh;
`

const FirstViewBox = styled.h1`
    font-size: 40px;
    font-weight: 600;
    width: 50%;
    height: 150px;
    text-align: center;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.asideBackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
`

const SFormWrapper = styled.div`
    width: 100vw;
    margin-top: 110px;
    display: flex;
    justify-content: center;
`

const CustomForm = ({
    className,
    children,
    onSubmit,
    ...props
}: {
    className?: string
    children: React.ReactNode
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) => (
    <form
        className={`validate__form ${className}`}
        method="POST"
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        {...props}>
        {children}
    </form>
)
const SFormInner = styled.div`
    background-color: white;
    padding: 60px;
    width: 80%;
    height: 100vh;
    border-radius: 80px;
    height: fit-content;
`

const SForm = styled(CustomForm)`
    margin: 0;
    padding: 0;
`

const SDl = styled.dl`
    display: flex;
    flex-direction: column;
`

const SDt = styled.dt`
    display: flex;
    align-items: center;

    & p {
        font-size: 20px;
        font-weight: 600;

        &::before {
            content: '必須';
            font-size: 10px;
            display: inline-block;
            margin-right: 10px;
            color: #f46804;
            vertical-align: middle;
            border: 1px solid #f46804;
            border-radius: 4px;
            padding: 0 6px;
        }
    }

    &.personal {
        margin-top: 50px;
    }

    &.is-response {
        margin-top: 50px;
    }
`

const SDd = styled.dd`
    margin-top: 10px;
    padding: 0;

    & + dt {
        margin-top: 50px;
    }

    & p {
        line-height: 1.75;
    }
`

type InputProps = React.ComponentPropsWithRef<'input'>

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            autoFocus,
            ...props
        }: { className?: string; autoFocus?: boolean },
        ref,
    ) => {
        return (
            <input
                className={`validate__target ${className}`}
                autoFocus={autoFocus}
                ref={ref}
                {...props}
            />
        )
    },
)

const SInput = styled(CustomInput)`
    outline: none;
    box-shadow: none;
    padding: 20px;
    border: 1px solid #dddddd;
    border-color: #dddddd;
    border-radius: 20px;
    font-size: auto;
    width: 100%;

    &::placeholder {
        color: #c7c7c7;
    }

    &.is-valid {
        border-color: #28a745;
        padding-right: calc(1.5em + 0.75rem);
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }

    &.is-invalid {
        border-color: #ff4136;
        padding-right: calc(1.5em + 0.75rem);
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ff4136' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ff4136' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
`

type InputTextareaProps = React.ComponentPropsWithRef<'textarea'>

const CustomTextarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
    (
        {
            className,
            children,
            autoFocus,
            ...props
        }: {
            className?: string
            autoFocus?: boolean
            children?: React.ReactNode
        },
        ref,
    ) => {
        return (
            <textarea
                className={`validate__target ${className}`}
                autoFocus={autoFocus}
                ref={ref}
                {...props}>
                {children}
            </textarea>
        )
    },
)

const STextarea = styled(CustomTextarea)`
    width: 100%;
    min-height: 277px;
    padding: 20px;
    border: 1px solid #dddddd;
    background: #fff;
    border-radius: 20px;
    font-size: auto;
    outline: none;

    &.is-valid {
        border-color: #28a745;
        padding-right: calc(1.5em + 0.75rem);
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }

    &.is-invalid {
        border-color: #ff4136;
        padding-right: calc(1.5em + 0.75rem);
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ff4136' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ff4136' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
`

const SPadding = styled.p`
    padding: 0;
    margin: 0;
    margin-top: 20px;
    font-weight: 400;
`

const CustomInputRadio = forwardRef<HTMLInputElement, InputProps>(
    ({ type, ...props }: { type?: string }, ref) => {
        return <input type={type} ref={ref} {...props} />
    },
)

const SInputRadio = styled(CustomInputRadio)`
    display: none;
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0;
    outline: none;

    &:checked + label:before {
        background-color: rgb(15, 132, 52);
    }
`

const SLabel = styled.label`
    position: relative;
    display: inline;
    padding-left: 30px;
    cursor: pointer;
    font-size: auto;

    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid #7e7e7e;
        border-radius: 4px;
        background: #fff;
        top: 0px;
        left: 3px;
    }
    &::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 5px;
        display: block;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        top: 7px;
        left: 7px;
        transform: rotate(-45deg);
    }
`

const SPaddingUnderLine = styled.dl`
    padding-bottom: 50px;
    border-bottom: 1px solid #dddddd;
    margin-top: 16px;
`

const SPersonalContainer = styled.div`
    padding: 30px 10px 0 30px;
    border-radius: 20px;
    border: 1px solid #dddddd;
    margin-top: 20px;
`

const SPersonalInner = styled.div`
    padding-right: 70px;
    height: 277px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(15, 132, 52);
        border-radius: 4px;
    }
`

const SUl = styled.ul`
    font-size: 14px;
    line-height: 1.75;
    list-style: none;
    margin: 0;
    padding: 0;
`

const SLi = styled.li`
    display: list-item;
    line-height: 1.75;

    &.last {
        margin-bottom: 60px;
    }
`

const SAgreeContainer = styled.p`
    text-align: center;
    margin-bottom: 50px;
    margin-top: 20px;
`

const SButton = styled.button`
    width: 200px;
    height: 60px;
    color: #fff;
    background-color: rgb(15, 132, 52);
    outline: none;
    cursor: pointer;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    position: relative;
    z-index: 1;
    transition: 0.3s;
    font-size: 20px;
    border: none;

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        border: none;
        background-color: #aeaeae;
        transform-origin: 100% 50%;
        transform: scaleX(0);
        transition: transform ease 0.3s;
    }
    &:hover {
        color: lightgreen;

        &::before {
            transform-origin: 0% 50%;
            transform: scaleX(1);
        }
    }
    &:disabled {
        opacity: 0.65;
        pointer-events: none;
    }
    &:not(:disabled) {
        cursor: pointer;
        opacity: 1;
    }
`

const CustomDiv = ({
    className,
    customRef,
    children,
    ...props
}: {
    className?: string
    customRef: React.MutableRefObject<HTMLDivElement | null>
    children?: React.ReactNode
}) => (
    <div
        ref={customRef}
        className={`invalid__feedback ${className}`}
        {...props}>
        {children}
    </div>
)

const SInvalidFeedback = styled(CustomDiv)`
    display: none;
    width: 100%;
    font-size: 80%;
    color: #ff4136;

    &.is-invalid {
        display: block;
    }
`

function convertDataToFormData(data: FormValues) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('contact', data.contact)
    formData.append('answer', data.answer)
    formData.append('agree', data.agree)
    return formData
}

export default function Contact() {
    const emailRegex = /[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+/
    const emailRegexStr = emailRegex.toString().slice(1).slice(0, -1)
    const nameInvalidFeedbackRef = useRef<HTMLDivElement>(null!)
    const emailInvalidFeedbackRef = useRef<HTMLDivElement>(null!)
    const contactContentInvalidFeedbackRef = useRef<HTMLDivElement>(null!)
    const { register, handleSubmit } = useForm<FormValues>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY}`
        script.setAttribute('async', '')
        document.body.appendChild(script)
    }, [])

    return (
        <ThemeProvider theme={Theme}>
            <SMain>
                <SSectionInner>
                    <FirstViewBox>お問い合わせ</FirstViewBox>
                </SSectionInner>
                <SFormWrapper>
                    <SFormInner>
                        <SForm
                            onSubmit={handleSubmit(async data => {
                                grecaptcha.ready(async function () {
                                    setLoading(true)
                                    const recaptchaToken = await grecaptcha.execute(
                                        process.env
                                            .NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!,
                                        { action: 'submit' },
                                    )
                                    const response = await fetch(
                                        'api/recaptcha',
                                        {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                            },
                                            body: JSON.stringify({
                                                token: recaptchaToken,
                                            }),
                                        },
                                    )
                                    const res = await response.json()
                                    if (!res.responseJsonRecaptcha.success) {
                                        console.error(
                                            'reCAPTCHA: ',
                                            res.responseJsonRecaptcha[
                                                'error-codes'
                                            ],
                                        )
                                        return
                                    }

                                    await setTokenToCookie()
                                    try {
                                        const response = await axios.post(
                                            '/tasks',
                                            convertDataToFormData(data),
                                        )
                                        if (!(+response.status == 204)) {
                                            //Todo 再度フォームを送信するように促す
                                            console.log('送信に失敗しました')
                                            setLoading(false)
                                        }
                                        router.push('/thanks')
                                    } catch (error) {
                                        errorHandler(error)
                                    }
                                })
                            })}>
                            <SDl>
                                <SDt>
                                    <p>お名前</p>
                                </SDt>
                                <SDd>
                                    <SInput
                                        type="text"
                                        placeholder="20文字以内で入力してください　(例)　山田　太郎"
                                        autoFocus
                                        required
                                        maxLength={20}
                                        {...register('name', {
                                            onBlur: e => {
                                                onBlurHandler(
                                                    e,
                                                    nameInvalidFeedbackRef,
                                                )
                                            },
                                        })}
                                    />
                                </SDd>
                                <SDd>
                                    <SInvalidFeedback
                                        customRef={nameInvalidFeedbackRef}
                                    />
                                </SDd>
                                <SDt>
                                    <p>メールアドレス</p>
                                </SDt>
                                <SDd>
                                    <SInput
                                        type="mail"
                                        placeholder="(例) abc@abc.com　(半角)"
                                        required
                                        pattern={emailRegexStr}
                                        {...register('email', {
                                            onBlur: e => {
                                                onBlurHandler(
                                                    e,
                                                    emailInvalidFeedbackRef,
                                                )
                                            },
                                        })}
                                    />
                                </SDd>
                                <SDd>
                                    <SInvalidFeedback
                                        customRef={emailInvalidFeedbackRef}
                                    />
                                </SDd>
                                <SDt>
                                    <p>お問い合わせ内容</p>
                                </SDt>
                                <SDd>
                                    <STextarea
                                        placeholder="2000文字以内で入力してください"
                                        required
                                        {...register('contact', {
                                            onBlur: e => {
                                                onBlurHandler(
                                                    e,
                                                    contactContentInvalidFeedbackRef,
                                                )
                                            },
                                        })}
                                    />
                                </SDd>
                                <SInvalidFeedback
                                    customRef={contactContentInvalidFeedbackRef}
                                />
                                <SDt className={'is-response'}>
                                    <p>お問い合わせへの回答は必要ですか？</p>
                                </SDt>
                                <SDd>
                                    <SPadding>
                                        <SInputRadio
                                            type={'radio'}
                                            id="radio01"
                                            value="回答必要"
                                            {...register('answer', {
                                                onChange: _ => {
                                                    activateSubmitBtn()
                                                },
                                            })}
                                        />
                                        <SLabel htmlFor="radio01">必要</SLabel>
                                    </SPadding>
                                    <SPadding>
                                        <SInputRadio
                                            type={'radio'}
                                            id="radio02"
                                            value="回答不要"
                                            {...register('answer', {
                                                onChange: _ => {
                                                    activateSubmitBtn()
                                                },
                                            })}
                                        />
                                        <SLabel htmlFor="radio02">不要</SLabel>
                                    </SPadding>
                                </SDd>
                                <SPaddingUnderLine />
                                <SDt className={'personal'}>
                                    <p>個人情報の取り扱いについて</p>
                                </SDt>
                                <SDd className="personal">
                                    <p>
                                        以下の「個人情報の取り扱いについて」をご確認いただき、同意いただいた上で、画面下部にある「確認」ボタンをクリックしてください。
                                    </p>
                                    <SPersonalContainer>
                                        <SPersonalInner>
                                            <SUl>
                                                <SLi>
                                                    個人情報の取り扱いについて
                                                </SLi>
                                                <SLi>
                                                    <dl>
                                                        <dt>
                                                            1.　個人情報の利用目的
                                                        </dt>
                                                        <dd>
                                                            取得した個人情報の利用目的については、問い合わせに関する返答及び諸連絡のために利用いたします。
                                                        </dd>
                                                    </dl>
                                                </SLi>
                                                <SLi>
                                                    <dl>
                                                        <dt>
                                                            2.　個人情報の第三者提供について
                                                        </dt>
                                                        <dd>
                                                            本人の同意がある場合又は法令に基づく場合を除き、取得した個人情報を第三者に提供することはありません。
                                                        </dd>
                                                    </dl>
                                                </SLi>
                                                <SLi>
                                                    <dl>
                                                        <dt>
                                                            3．個人情報の取扱いの委託について
                                                        </dt>
                                                        <dd>
                                                            取得した個人情報の取扱い全部又は、一部を委託することがありません。
                                                        </dd>
                                                    </dl>
                                                </SLi>
                                                <SLi className="last">
                                                    <dl>
                                                        <dt>
                                                            4．個人情報の安全管理措置について
                                                        </dt>
                                                        <dd>
                                                            クッキーやウェブビーコン等を用いるなどして、本人が容易に認識できない方法による個人情報の取得は行っておりません。
                                                            取得した個人情報については、漏えい、滅失又は毀損の防止と是正、その他個人情報の安全管理のために必要かつ適切な措置を講じます。
                                                        </dd>
                                                    </dl>
                                                </SLi>
                                            </SUl>
                                        </SPersonalInner>
                                    </SPersonalContainer>
                                    <SAgreeContainer>
                                        <SInputRadio
                                            type="checkbox"
                                            id="check01"
                                            value="同意します"
                                            required
                                            {...register('agree', {
                                                onChange: _ => {
                                                    activateSubmitBtn()
                                                },
                                            })}
                                        />
                                        <SLabel htmlFor="check01">
                                            個人情報の取扱いについて同意します
                                        </SLabel>
                                    </SAgreeContainer>
                                </SDd>
                            </SDl>
                            {loading ? (
                                <SDd>
                                    {/* Todo 中央揃えにする */}
                                    <p>データを送信中です</p>
                                    <Spinner />
                                </SDd>
                            ) : (
                                <div>
                                    <SButton disabled>送信する</SButton>
                                </div>
                            )}
                        </SForm>
                    </SFormInner>
                </SFormWrapper>
            </SMain>
        </ThemeProvider>
    )
}
