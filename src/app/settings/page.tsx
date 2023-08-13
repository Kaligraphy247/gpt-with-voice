"use client";

import { useToast } from "../components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export default function Settings() {
  return (
    <div className="border my-10 rounded shadow dark:shadow-lg dark:shadow-neutral-900">
      <div className="px-4">
        <h1 className="text-3xl font-bold text-center py-4">Settings</h1>
        <Accordion
          type="single"
          collapsible
          defaultValue="voices"
          className="mb-12"
        >
          <AccordionItem value="openai-key">
            <AccordionTrigger>
              <Label className="text-xl">OpenAI Secret Key</Label>
            </AccordionTrigger>
            <AccordionContent>
              <SetOpenAIKey />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="voices">
            <AccordionTrigger>
              <Label className="text-xl">Voices</Label>
            </AccordionTrigger>
            <AccordionContent>
              <SetVoices />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionTrigger>
              <Label className="text-xl">Billing</Label>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-2xl">🚧 🚧 Coming Soon 🚧 🚧</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

/**
 * Sets the OpenAI key.
 *
 * @return {JSX.Element} The JSX element representing the form.
 */
function SetOpenAIKey() {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  return (
    <form>
      <div className="flex flex-row space-x-4">
        <Input type="text" name="" id="" defaultValue={"the_secret_key"} />
        <Dialog open={editing} onOpenChange={setEditing}>
          <DialogTrigger>
            <Button className="w-16" type="button">
              Set
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Save new OpenAI key?
              </DialogTitle>
            </DialogHeader>
            <div className="space-x-4 flex items-center justify-center">
              <Button
                onClick={() => {
                  // todo do something here
                  setEditing(false);
                  toast({
                    title: "Saved!",
                  });
                }}
              >
                Save
              </Button>
              <Button variant={"secondary"} onClick={() => setEditing(false)}>
                Go Back
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-2 text-muted-foreground text-[14px]">
        <AlertCircle size={14} className="mt-1" />
        <p className="">Please keep your secret key safe.</p>
      </div>
    </form>
  );
}

/**
 * A function to set the voices.
 *
 * @param {string} value - The new value selected in the select component.
 * @return {void}
 */
function SetVoices() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { toast } = useToast();
  /**
   * A function to handle the change event of the select component.
   *
   * @param {string} value - The new value selected in the select component.
   */
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  // start
  return (
    <div className="flex flex-col">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[360px]">
          <SelectValue placeholder="Select a voice to use" />
        </SelectTrigger>
        <SelectContent>
          {audioSrc.map((audio, index) => (
            <SelectItem key={index} value={audio.value}>
              {audio.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <audio
        controls
        controlsList="nodownload"
        key={selectedValue}
        autoPlay
        className="py-2"
      >
        <source src={selectedValue} />
      </audio>
      <div>
        <Button
          className="w-16"
          onClick={() => {
            toast({
              title: "Saved!",
            });
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

// TODO Remove me
const audioSrc = [
  {
    label: "Male 01",
    value: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    label: "Female 03",
    value: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    label: "Neutral 04",
    value: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];
