import React from "react";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoDocumentText,
  IoMail,
} from "react-icons/io5";

import { Dock, DockIcon } from "@/components/dock";
import { siteConfig } from "@/config/site";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  return (
    <button className="self-end" onMouseDown={(e) => e.stopPropagation()}>
      <Dock>
        <DockIcon url={siteConfig.links.github}>
          <IoLogoGithub className="h-5 w-5" />
        </DockIcon>
        <DockIcon url={siteConfig.links.linkedin}>
          <IoLogoLinkedin className="h-5 w-5" />
        </DockIcon>
        <DockIcon url={siteConfig.links.email}>
          <IoMail className="h-5 w-5" />
        </DockIcon>
      </Dock>
    </button>
  );
}
