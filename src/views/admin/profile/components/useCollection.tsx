import { useQuery } from "@tanstack/react-query"

const useCollection = () => {

    const {
		data: collection,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["collections"],
		queryFn: () =>
			fetch(`http://localhost:3000/collections`).then(
				(response) => response.json()
			),
				
	})
  return { collection, isLoading, error}
}

export default useCollection