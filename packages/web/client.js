import { createClient } from 'next-sanity';

export default createClient({
  projectId: 'pb6axv26', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2022-09-20',
  token: process.env.SANITY_TOKEN
});
