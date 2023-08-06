const ProjectContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex-1">
        <div className="text-right">top menu: will have buttons fullscreen, desktop view, mobileview</div>
        <div className="p-5 pt-0">
            { children }
        </div>
    </div>
}

export default ProjectContainer;