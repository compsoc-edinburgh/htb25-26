import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import ArrowSVG from "./arrows-animated";
import MailingListInputButton from "./mailing-list-button";
import { toast } from "sonner";


const GetNotificationsCard = () => {
    return (
        <Card className="border-0 bg-[#FAD2A0]">
            <CardContent className="font-tekstur text-[#F0563C] text-3xl font-semibold text-left p-8">
                Join our mailing list to stay up to date on the hackathon!
            </CardContent>
        </Card>
    )
}

const ArrowsCard = ({ arrowColor = 'white', cardColor = '#2A4FEE' }) => {
    return (
        <Card className={`border-0 bg-[${cardColor}] flex-1 overflow-hidden`}>
            <CardContent className="font-tekstur p-3 flex gap-4">
                <ArrowSVG arrowColor={arrowColor}></ArrowSVG>
            </CardContent>
        </Card>
    )
}

const NotifyMeCard = () => {

    return (
        <Card className="border-0 bg-white w-full h-full items-center">
            <CardContent className="flex items-center gap-2 p-5 w-full h-full">
                <MailingListInputButton></MailingListInputButton>
            </CardContent>
        </Card>
    )
}

export const NotificationsCard = {
    GetNotificationsCard,
    ArrowsCard,
    NotifyMeCard
  } as const;