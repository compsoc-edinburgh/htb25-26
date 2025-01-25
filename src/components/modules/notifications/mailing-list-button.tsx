"use client"
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { api } from "~/trpc/react";

const MailingListInputButton = () => {
    const [email, setEmail] = useState('')

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        console.log(event.target.value);
      };
    
    const addEmail = api.mailingList.addEmailToMailingList.useMutation({
        onSuccess: (data) => {
            console.log("Email added:", data);
            // Optionally show a success message
        },
        onError: (error) => {
            console.error("Error adding email:", error);
            // Optionally show an error message
        }
    });

    const handleSubmit = async () => {
        try {
        await addEmail.mutateAsync({
            email: email,
            subscribed: true
          }).then( () => {
            console.log("Email successfully added to the mailing list!");
          }
          )
        }
        catch (error){
            console.error("There was an error adding the email:", error);
        }
    }
     return (
        <>
            <Input type="email" placeholder="Email address.." className="basis-2/3 bg-[#EEEEEE] font-tektur md:text-xs lg:text-sm border-transparent text-gray-700" onChange={handleEmailChange}></Input>
            <Button className="basis-1/3 bg-[#2A4FEE] font-tektur text-sm text-white hover:bg-blue-700 md:text-sm lg:text-xl" onClick={handleSubmit}>
                Subscribe
            </Button>
        </>
    )
}

export default MailingListInputButton;