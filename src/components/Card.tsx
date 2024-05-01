import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import "./Card.css";
// import all images for articles
// no easy way to do dynamic imports
import jitz from "../assets/images/jitz.jpg";
import dating from "../assets/images/dating.jpeg";
import alpha_statue from "../assets/images/alpha_statue.jpeg";

const THUMBNAILS = {
  jitz,
  dating,
  alpha_statue,
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
      <img className="card-image" src={THUMBNAILS[ogImage]?.src} />
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
