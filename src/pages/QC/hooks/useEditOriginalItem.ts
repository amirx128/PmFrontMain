import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  GetAllSubItemsAction,
  GetOriginalItemsDataAction,
  UpdateOriginalItemAction,
} from '../../../redux/features/qcSlicer';

const useEditOriginalItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const { subItems, originalItemsUpdateState, selectedOriginalItem } =
    useSelector((state: any) => state?.qc);

  const [info, setInfo] = useState({
    name: '',
    subItemsIds: [],
  });

  useEffect(() => {
    getOriginalItemData();
    getSubItems();
  }, []);

  useEffect(() => {
    if (selectedOriginalItem?.data) {
      setInfo({
        name: selectedOriginalItem?.data?.name,
        subItemsIds: selectedOriginalItem?.data?.subItems?.map(
          (subItem) => subItem.id
        ),
      });
    }
  }, [selectedOriginalItem]);

  const getSubItems = async () => {
    await dispatch(GetAllSubItemsAction());
  };

  const getOriginalItemData = async () => {
    await dispatch(GetOriginalItemsDataAction({ selectedItemId: +id }));
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const handleSubmit = async () => {
    await dispatch(
      UpdateOriginalItemAction({
        id: +id,
        name: info.name,
        subItemsIds: info.subItemsIds,
      })
    );
    await getOriginalItemData();
  };

  return {
    id,
    info,
    handleChange,
    subItems,
    setInfo,
    handleSubmit,
    originalItemsUpdateState,
  };
};

export default useEditOriginalItem;
