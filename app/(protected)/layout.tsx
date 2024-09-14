import  Sidebar  from "@/app/(protected)/_components/sidebar";



interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full flex flex-col gap-y-10 bg-[#232D7E]">
            
            <Sidebar>
                {children}
            </Sidebar>
            
        </div>
    )

    
};

export default ProtectedLayout;