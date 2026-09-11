/**
 * Publisher data access helpers.
 *
 * This module exposes read-only queries for the publishers table used when building
 * static pages and listing publisher metadata across the site.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetches every publisher in alphabetical order by name.
 *
 * @param db - Database connection used to read publisher records.
 * @returns A promise that resolves to all publishers sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
