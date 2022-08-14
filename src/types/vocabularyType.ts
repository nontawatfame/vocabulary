export interface Vocabulary {
    name: string,
    type_id: number,
    meaning: string,
    sound: string
}

export interface VocabularyTable {
    id: number;
    name: string;
    type_id: number;
    meaning: string;
    create_at: Date;
    updated_at: Date;
    sound: string;
    abbreviation: string;
}