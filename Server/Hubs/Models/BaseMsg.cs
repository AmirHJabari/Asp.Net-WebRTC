namespace Server.Hubs.Models;

public abstract class BaseMsg
{
    public string ToSocketId { get; set; }
    public string FromSocketId { get; set; }
}
