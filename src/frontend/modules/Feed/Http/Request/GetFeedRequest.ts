export interface GetFeedRequest
{
    cursor?: number;
    dateFrom?: string;
    dateTo?: string;
    // profile_id?: number; 
    profile?: number;
    sort?: "id" | "rating" | "hot";
    direction?: "ASC" | "DESC";
    tags?: string;
    query?: string;
    vote_type?: "all" | "positive" | "negative"
    [key: string]: any;
}