import crypto from 'crypto';

/**
 * Generates a unique ID based on the current date-time and a random hex string.
 * @returns {string} A unique ID.
 */
export default function generateUniqueId() {
    const currentDateTime = new Date().toISOString();
    return `${currentDateTime}-${crypto.randomBytes(4).toString('hex')}`;
}