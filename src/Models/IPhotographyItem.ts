export interface IPhotographyItem {
    iso: string
    aperture: string
    focalLength: string
    shutterSpeed: string
    location: string
    time: string
    imageUri: string
}

export interface IPhotographyItemsList {
    photographs: Array<IPhotographyItem>
}