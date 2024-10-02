// "use client"

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
// } from "./ui/select"

// import { LanguagesSupported, LanguageSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store"
// import { SelectValue } from "@radix-ui/react-select";
// import { usePathname } from "next/navigation";
// import LoadingSpinner from "./LoadingSpinner";
// import Link from "next/link";
// import React from "react";

// const LanguageSelect = () => {
//     const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore((state) => [
//         state.language,
//         state.setLanguage,
//         state.getLanguages,
//         state.getNotSupportedLanguages
//     ]);

//     const subscription = useSubscriptionStore((state) => state.subscription);
//     const isPro = subscription?.role === "pro" && subscription?.status === "active";

//     const pathName = usePathname();
//     const isChatPage = pathName.includes("chat");


//     return isChatPage && (
//         <div className="">
//             <Select
//                 onValueChange={(value: LanguagesSupported) => setLanguage(value)}
//             >
//                 <SelectTrigger className="w-[150px] text-black dark:text-white">
//                     <SelectValue
//                         placeholder={LanguageSupportedMap[language]} 
//                         className=""
//                         />
//                 </SelectTrigger>

//                 <SelectContent>
//                     {subscription === undefined ? (
//                         <LoadingSpinner />
//                     ) : (
//                         <>
//                             {getLanguages(isPro).map((language) => (
//                                 <SelectItem key={language} value={language}>
//                                     {LanguageSupportedMap[language]}
//                                 </SelectItem>
//                             ))}
//                             {getNotSupportedLanguages(isPro).map((language) => (
//                                 <Link href={"/register"} key={language} prefetch={false}>
//                                     <SelectItem
//                                         key={language}
//                                         value={language}
//                                         disabled
//                                         className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
//                                     >
//                                         {LanguageSupportedMap[language]} (PRO)
//                                     </SelectItem>
//                                 </Link>
//                             ))}
//                         </>
//                     )}
//                 </SelectContent>
//             </Select>
//         </div>
//     )
// }

// export default LanguageSelect;

"use client"

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { LanguagesSupported, LanguageSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

const LanguageSelect = () => {
    const languageStore = useLanguageStore();
    const subscriptionStore = useSubscriptionStore();
    
    const pathName = usePathname();
    const isChatPage = pathName.includes("chat");

    const isPro = subscriptionStore.subscription?.role === "pro" && subscriptionStore.subscription?.status === "active";

    if (!isChatPage) return null;

    return (
        <div className="">
            <Select
                onValueChange={(value: LanguagesSupported) => languageStore.setLanguage(value)}
            >
                <SelectTrigger className="w-[150px] text-black dark:text-white">
                    <SelectValue
                        placeholder={LanguageSupportedMap[languageStore.language]} 
                        className=""
                    />
                </SelectTrigger>

                <SelectContent>
                    {subscriptionStore.subscription === undefined ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {languageStore.getLanguages(isPro).map((language) => (
                                <SelectItem key={language} value={language}>
                                    {LanguageSupportedMap[language]}
                                </SelectItem>
                            ))}
                            {languageStore.getNotSupportedLanguages(isPro).map((language) => (
                                <Link href={"/register"} key={language} prefetch={false}>
                                    <SelectItem
                                        key={language}
                                        value={language}
                                        disabled
                                        className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                                    >
                                        {LanguageSupportedMap[language]} (PRO)
                                    </SelectItem>
                                </Link>
                            ))}
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelect;