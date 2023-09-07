namespace Server.Hubs.Models;

public class OfferRequest
{
    public string FromId { get; set; }
    public string ToId { get; set; }
    public OfferObj Offer { get; set; }

    public class OfferObj
    {
        public string Sdp { get; set; }
        public string Type { get; set; }
    }
}