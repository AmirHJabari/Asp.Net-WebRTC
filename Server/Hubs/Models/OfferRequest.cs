using System.Dynamic;

namespace Server.Hubs.Models;

public class OfferRequest : BaseMsg
{
    public ExpandoObject Offer { get; set; } = new ExpandoObject();
}