import FullPageScroll from "@/components/pages/full-page-scroll";
import {AboutMePage} from "@/components/pages/about-me-page";
import {SkillsPage} from "@/components/pages/skills-page";
import {ProjectsPage} from "@/components/pages/projects-page";

export default function Home() {
  const pages = [AboutMePage, SkillsPage, ProjectsPage];

  return (
      <FullPageScroll pages={pages}/>
  );
}
