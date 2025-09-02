import { BellIcon } from "@/src/assets/bell-icon";
import { DocIcon } from "@/src/assets/doc-icon";
import { EditIcon } from "@/src/assets/edit-icon";
import { EnterpriseIcon } from "@/src/assets/enterprise-icon";
import { SitemapIcon } from "@/src/assets/sitemap-icon";
import { TimeLoopIcon } from "@/src/assets/time-loop-icon";
import { UserIcon } from "@/src/assets/user-icon";


export default {
    BASE_URL: process.env.REACT_APP_BASE_URL || "http://localhost:3001",
    activitiesList: [
        { label: "Agricultura", value: "agriculture" },
        { label: "Atendimento em Saúde", value: "healthcare" },
        { label: "Indústria Alimentícia", value: "food_industry" },
      ],
      epiList: [
        { label: "Cinto de Segurança", value: "safety_belt" },
        { label: "Colete Refletivo", value: "reflective_vest" },
        { label: "Avental de Proteção", value: "protective_apron" },
      ],
      jobPositionsList: [
        { label: "Enfermeiro", value: "nurse" },
        { label: "Analista de Logística", value: "logistics_analyst" },
        { label: "Gerente de Projetos", value: "project_manager" },
      ],
      menuItems: [
        {
          key: "enterprise",
          icon: EnterpriseIcon,
          href: "/",
          view: true,
        },
        {
          key: "edit",
          icon: EditIcon,
          href: "/employee/list",
          view: true,
        },
        {
          key: "sitemap",
          icon: SitemapIcon,
          href: "/soon",
          view: true,
        },
        {
          key: "bell",
          icon: BellIcon,
          href: "/soon",
          badge: DocIcon,
          view: true,
        },
        {
          key: "time",
          icon: TimeLoopIcon,
          href: "/soon",
          view: true,
        },
        {
          key: "user",
          icon: UserIcon,
          href: "/soon",
          view: true,
        },
        {
          key: "add",
          icon: null,
          href: "/employee/create",
          view: false,
        },
      ],
      steps: [
      ]
};
