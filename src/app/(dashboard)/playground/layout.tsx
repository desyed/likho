import Sidebar from "@/app/(dashboard)/components/sidebar";
import ProjectContainer from "@/app/(dashboard)/components/projectContainer";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {

  return (
      <div className="flex w-full min-h-full">
        <Sidebar />
        <ProjectContainer>
          {children}
        </ProjectContainer>
      </div>
  )
}
