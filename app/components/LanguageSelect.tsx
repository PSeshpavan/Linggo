"use client"

import React, { useEffect } from "react";
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
    const fetchSubscription = subscriptionStore.fetchSubscription;
    
    const pathName = usePathname();
    const isChatPage = pathName.includes("chat");

    const isPro = subscriptionStore.subscription?.role === "pro" && subscriptionStore.subscription?.status === "active";

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    if (!isChatPage) return null;

    return (
        <div className="mr-0.5">
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