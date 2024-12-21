import Papa from 'papaparse';
import type { Contact } from '../types';

export function parseCSV(file: File): Promise<Omit<Contact, 'id' | 'lastContacted'>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const contacts = results.data.map((row: any) => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          phone: row.phone || row.Phone || '',
          company: row.company || row.Company || '',
          location: row.location || row.Location || '',
          status: 'active',
        }));

        // Validate required fields
        const validContacts = contacts.filter(
          contact => contact.name && contact.email
        );

        resolve(validContacts);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}