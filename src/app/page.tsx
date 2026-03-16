import FullPageScroll from "@/components/pages/full-page-scroll";
import {AboutMePage} from "@/components/pages/about-me-page";
import {ExperiencePage} from "@/components/pages/experience-page";
import {ProjectsPage} from "@/components/pages/projects-page";

export default function Home() {
  const pages = [AboutMePage, ExperiencePage, ProjectsPage];

  return (
      <FullPageScroll pages={pages}/>
  );
}
