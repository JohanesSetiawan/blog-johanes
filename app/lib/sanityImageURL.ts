import  ImageUrlBuilder  from "@sanity/image-url/";
import { sanityClient } from "./sanity";

const builder = ImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}