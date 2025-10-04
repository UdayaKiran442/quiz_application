/**
 * @description Controller for handling attempts-related operations.
 * @description It interacts with the attempts repository and manages exceptions.
 * 
 * @author Udaya Kiran Gonuguntla
 */

import { AddAttemptError } from "../exceptions/attempts.exceptions";
import { addAttemptToDB } from "../repository/attempts.repository";
import { IAddAttemptSchema } from "../routes/v1/attempts.route";

export async function addAttempt(payload: IAddAttemptSchema){
    try {
        return await addAttemptToDB(payload);
    } catch (error) {
        throw new AddAttemptError("Unable to add attempt", { cause: (error as Error).message });
    }
}