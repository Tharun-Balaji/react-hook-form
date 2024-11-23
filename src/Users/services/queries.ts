import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Option } from '../../types/options';

export function useStates() { 
  return useQuery({
    queryKey  : ['states'],
    queryFn: () => axios.get<Option[]>("http://localhost:8080/states")
      .then(res => res.data)
  })
};