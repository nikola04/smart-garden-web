import { useParams } from "react-router";
import ProjectSection from "../components/ProjectSection";
import { Card, CardContent } from "@/components/ui/card";

function Settings(){
    const {  } = useParams<{ projectId: string }>()

    return <div className="flex flex-col gap-8 p-4">
        <ProjectSection title="General Settings" description="Basic project information and parameters.">
            <Card>
                <CardContent>
                    <div>

                    </div>
                </CardContent>
            </Card>
        </ProjectSection>
        <ProjectSection title="Device Managment" description="Settings related to devices connected to the project.">
            <Card>
                <CardContent>
                </CardContent>
            </Card>
        </ProjectSection>
        <ProjectSection title="Data & Reporting" description="How project data is stored and reports are generated.">
            <Card>
                <CardContent>
                </CardContent>
            </Card>
        </ProjectSection>
        <ProjectSection title="Alerts & Notifications" description="Configuration of alerts and notifications.">
            <Card>
                <CardContent>
                </CardContent>
            </Card>
        </ProjectSection>
    </div>
}

export default Settings;
