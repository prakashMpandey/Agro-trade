const { isLoading, setLoadingState } = useAuthStore();
const [loadingBids, setLoadingBids] = useState(true);
const [loadingAuction, setLoadingAuction] = useState(true);

// Fetch Bids
const fetchAllBids = async () => {
  try {
    setLoadingBids(true);
    const response = await fetch(`${Auction_URL}/getAllPlacedBids/${auctionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setBids(data.data || []);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error("Failed to load bid history");
  } finally {
    setLoadingBids(false);
  }
};

// Fetch Auction Data
const fetchAuctionData = async () => {
  try {
    setLoadingAuction(true);
    const response = await fetch(`${Auction_URL}/getAuction/${auctionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const receivedData = await response.json();
      setAuctionData(receivedData.data);
    }
  } catch (error) {
    toast.error("Failed to load auction data");
  } finally {
    setLoadingAuction(false);
  }
};

// Place Bid
const handlePlaceBid = () => {
  setLoadingState(true);
  socket.emit("placeBid", { auctionId, bidAmount });
};

useEffect(() => {
  socket.on("placeBid", (data) => {
    setLoadingState(false);
    if (data?.status === 200) {
      toast.success(data?.message || "Bid placed successfully", { delay: 100 });
    } else {
      toast.error(data?.message);
    }
  });

  return () => {
    socket.off("placeBid");
  };
}, []);

// Initial Data Fetch
useEffect(() => {
  fetchAuctionData();
  fetchAllBids();
}, []);

// UI Loading Condition
if (loadingAuction || loadingBids) {
  return <LoadingPage />;
}
