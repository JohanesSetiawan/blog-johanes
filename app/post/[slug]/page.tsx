import { Post } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanityImageURL";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string) {
  const qry = `*[_type == "post" && slug.current == "${slug}"][0]`;
  const data = await sanityClient.fetch(qry);

  return data;
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as Post;
  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          className="rounded-lg"
          width={750}
          height={750}
        ></Image>
      ),
    },
  };

  return (
    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(data._createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl">
              {data.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg">
            <PortableText
              value={data.content}
              components={PortableTextComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
