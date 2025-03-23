
import {Header} from "@/components/header";
import {Badge} from "@/components/ui/badge";
import {SkillGrid} from "@/components/skill-grid";
import Link from "next/link";
import {Title1, Text, Title2} from "@/components/text";
import {Projects} from "@/components/projects";
import FullPageScroll from "@/components/pages/full-page-scroll";
import {AnimatePresence, motion} from "framer-motion";
import {AboutMePage} from "@/components/pages/about-me-page";
import {SkillsPage} from "@/components/pages/skills-page";
import {ProjectsPage} from "@/components/pages/projects-page";


export default function Home() {
  const pages = [AboutMePage, SkillsPage, ProjectsPage];

  return (
      <FullPageScroll pages={pages}/>
  );
}
