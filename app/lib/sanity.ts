import { createClient } from "next-sanity"

const projectId = '3q1dsgza'
const dataset = 'production'
const apiVersion = '2023-09-10'

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true
})

