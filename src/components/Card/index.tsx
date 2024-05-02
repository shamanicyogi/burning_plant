import { slugifyStr } from "@utils/slugify";
import Datetime from "../Datetime";
import type { CollectionEntry } from "astro:content";
import "./Card.css";
// import all images for articles
// no easy way to pass image path to <img> tag
import yoga_forest from "../../assets/images/yoga_forest.jpeg";

const THUMBNAILS = {
  yoga_forest,
  "": yoga_forest,
};

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, ogImage } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="card-container my-6">
      <img
        className="card-image"
        src={
          THUMBNAILS[(ogImage as keyof Omit<typeof THUMBNAILS, "''">) || ""]
            ?.src
        }
      />
      <div>
        <a
          href={href}
          className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        <p>{description}</p>
      </div>
    </li>
  );
}
