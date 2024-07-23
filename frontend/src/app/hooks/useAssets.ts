import {useAssetsStore} from "@/app/store/useAssetsStore";
import axiosInstance from "@/utils/axiosInstance";
import {ErrorToast} from "@/app/components/common/Toast/Toast";

export const useAssets = () => {
    const {
        setAssets,
        assetsLoading,
        setAssetsLoading,
        setFetchedAssets,
    } = useAssetsStore();

    const fetchAssets = async () => {
        if (assetsLoading) return;
        setAssetsLoading(true);

        try {
            const response = await axiosInstance.get('/assets');
            setAssets(response.data);
            setFetchedAssets(true);
        } catch (error) {
            console.error('Failed to fetch assets:', error);
            setFetchedAssets(true);
            ErrorToast('Failed to fetch assets');
            setAssets([]);
        } finally {
            setAssetsLoading(false);
        }
    };

    return {
        fetchAssets,
    };
};
