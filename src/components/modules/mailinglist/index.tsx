import { Card, CardContent } from "../../ui/card";
import ArrowSVG from "./arrows-animated";
import MailingListForm from "./mailing-list-form";

const MailingListInfoCard = () => {
  return (
    <Card className="border-0 bg-[#FAD2A0]">
      <CardContent className="font-tekstur p-8 text-left text-xl font-semibold text-[#F0563C] md:text-2xl lg:text-3xl">
        Join our mailing list to stay up to date on the hackathon!
      </CardContent>
    </Card>
  );
};

const ArrowsCard = ({ arrowColor = "white", cardColor = "#2A4FEE" }) => {
  return (
    <Card className={`border-0 bg-[${cardColor}] flex-1 overflow-hidden`}>
      <CardContent className="font-tekstur flex gap-4 p-3">
        <ArrowSVG arrowColor={arrowColor}></ArrowSVG>
      </CardContent>
    </Card>
  );
};

const MailingListInputCard = () => {
  return (
    <Card className="h-full w-full items-center border-0 bg-white">
      <CardContent className="flex h-full w-full items-center justify-center gap-2 p-5">
        <MailingListForm />
      </CardContent>
    </Card>
  );
};

export const MailingListCards = {
  MailingListInfoCard,
  ArrowsCard,
  MailingListInputCard,
} as const;
