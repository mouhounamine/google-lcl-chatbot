import { Button } from "@/components/ui/button";
import { useState } from "react";

const PromptSection = () => {
    const [prompt, setPrompt] = useState<string>("");
    return ( 
        <div className="flex m-4 h-[10%] justify-center items-center">
            <div className="w-[90%] h-[75%] rounded-xl border-2 border-dashed border-primary p-4">
                <div className="flex w-full h-full">
                    <textarea
                        className="w-full resize-none outline-none bg-transparent"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="Entrez votre question ici..."
                        style={{ height: "100%", minHeight: "100px" }}
                    />
                    <div className="flex items-center justify-center">
                        <Button className="ml-2 bg-black font-semibold text-white rounded-xl hover:bg-slate-800" size="sm" onClick={() => console.log(prompt)}>Envoyer</Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PromptSection