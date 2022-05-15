import useSWR, { KeyedMutator } from "swr";
import { getEndpoint } from "../../utils/apiEndpoints";
import { fetcher, ResError } from "./fetcher";

interface IProfile {
    id: string;
    username: string;
    email: string
}

const useProfile = (): {
    profileData: IProfile;
    isProfileLoading: boolean;
    profileHasError: ResError;
    mutateProfile: KeyedMutator<IProfile>;
} => {
    const { data, error, mutate } = useSWR(`${getEndpoint("profile")}`, fetcher);
    return {
        profileData: data,
        isProfileLoading: !error && !data,
        profileHasError: error,
        mutateProfile: mutate,
    };
};

export { useProfile };
export type {IProfile};