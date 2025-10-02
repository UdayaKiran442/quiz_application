/**
 * Generates a random Nano ID
 * @author Udaya Kiran Gonuguntla
 * @returns A random Nano ID string
 * @description UUID are heavy and take a lot of space, so we use Nano ID
 */

import { nanoid } from "nanoid"

export function generateNanoId() {
    return nanoid()
}