namespace Server.Hubs.Models;

public class PreOfferRequest
{
    public string FromUserId { get; set; }
    public string UserName { get; set; }
    public string ToUserId { get; set; }
    public string CallType { get; set; }
}