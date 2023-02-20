import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import client from '@root/client';

const fetchImage = (image: SanityImageSource) => imageUrlBuilder(client).image(image);

export default fetchImage;
