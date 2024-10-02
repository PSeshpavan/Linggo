// https://github. com/invertase/stripe-firebase-extensions/b10b/107ø31923116d776aceød33011a28d29e48fe827/firestore-stripe—payments/functions/src/interfaces.ts

import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
import Stripe from "stripe";

export interface Subscription {
    id: string;
    /**
     * Set of key-value pairs that you can attach to an object. 
     * This can be useful for storing additional information about the object in a structured format.
     */
    metadata: {
        name : string,
        Role : string;
    };
    stripeLink: string;
    role: string | null;
    quantity: number;
    items: Stripe.SubscriptionItem[];
    /**
     * Firestore reference to the product doc for this Subscription.
     */
    product: DocumentReference<DocumentData>;
    /**
     * Firestore reference to the user doc for this Subscription.
     */
    price: DocumentReference<DocumentData>;
    /**
     * Firestore reference to the price for this Subscription.
     */
    prices: Array <
        DocumentReference<DocumentData>
    >;
    payment_method?: string;
    latest_invoice?: string;
    /**
     * The status of the Subscription object.
     */
    status: 
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "trialing"
        | "unpaid";
    /**
    * If True the subscription has been cancelled by the user and will be deleted at the end of the billing period.
    */
    cancel_at_period_end: boolean;
    /**
     * The time at which the Subscription was created.
     */
    created: Timestamp;
    /**
     * Start the current period that the subscription has been invoiced for.
     */
    current_period_start: Timestamp;
    /**
     * End of the current period for which the subscription has been invoiced. At the end of this period, a new invoice will be created.
     */
    current_period_end: Timestamp;
    /**
     * If the subscription has ended, the timestamp of the date the subscription ended.
     */
    ended_at: Timestamp | null;
    /**
     * A date in the future at which the subscription will automatically get cancelled.
     */
    /**
     * If the subscription has been ended, the date of that cancellation. If the subscriptionwas cancelled with 'cancel_at_period_end', 'canceled_at' will still reflect the date of the initial subscription cancelation request, not the end of the subscription period when it is canceled automatically moved to a cancelled state.
     */
    cancelled_at: Timestamp | null;
    /**
     * If the subscription has a trail, the beginning of the trail period.
     */
    trial_start: Timestamp | null;
    /**
     * If the subscription has a trial, the end of the trial period.
     */
    trial_end: Timestamp | null;
}