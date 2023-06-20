interface FsResponse {
    shares:
    {
        isdir: boolean;
        name: string;
        path: string;
        additional: {
            owner: {
                gid: number;
                group: string;
                uid: number;
                user: string;
            },
            real_path: string;
            time: {
                atime: number;
                crtime: number;
                ctime: number;
                mtime: number;
            }
        }
    } [];
    offset: number;
    total: number;
}