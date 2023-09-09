import { fetchSectionList } from '@/lib/fetchData'
import SectionList from './section-list'

function SDiv({ children }: { children: React.ReactNode }) {
    return <div className="section__list__div">{children}</div>
}

function SPadding({ children }: { children: React.ReactNode }) {
    return <div className="section__list__padding">{children}</div>
}

function SUl({ children }: { children: React.ReactNode }) {
    return <ul className="section__list__ul">{children}</ul>
}

export default async function FetchSectionList() {
    const sectionList = await fetchSectionList()

    return (
        <SDiv>
            <SPadding>単元一覧</SPadding>
            <SUl>
                <SectionList sectionList={sectionList} />
            </SUl>
        </SDiv>
    )
}
