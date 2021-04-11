export interface IPortfolioItemsList {
    items: Array<IPortfolioItem>
}
export interface IPortfolioItem {
    id: number
    imageUri: string
    markdown: string
}