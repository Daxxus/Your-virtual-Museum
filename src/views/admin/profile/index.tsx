import axios from "axios";
import Stack from "@mui/material/Stack";
import useCollection from "./components/useCollection";
import CollectionCard from "./components/CollectionCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface CollectionProps {
  id: any;
  link: any;
  title: string;
  place: string[];
  web: any;
  maker: string;
}

const Collection = () => {
  const { collection } = useCollection();

  const deleteCard = async (id: void) => {
    const response = await axios.delete(
      `http://localhost:3000/collections/${id}`
    );
    const { data: order } = response;
    return order;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await deleteCard(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: () => {
      console.log("Error !!!!!");
    },
  });

  const handleDelete = (id: any) => {
    mutation.mutate(id);
  };

  return (
    <Stack mt={1}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
        {collection?.map(
          ({ id, link, title, place, web, maker }: CollectionProps) => {
            return (
              <CollectionCard
                link={link}
                title={title}
                place={place}
                web={web}
                maker={maker}
                key={id}
                deleteCard={() => handleDelete(id)}
              />
            );
          }
        )}
      </div>
    </Stack>
  );
};

export default Collection;
