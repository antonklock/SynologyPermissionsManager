import FilestationExample from '../data/filestationExampleResponse.json';

const GetAmountOfFolders = (response: FsResponse) => {
    return response.total;
}

const GetFolders = (response: FsResponse) => {
    return response.shares;
}

export { GetAmountOfFolders, GetFolders };