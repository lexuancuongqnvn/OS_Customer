using ERP.Common.Models;

namespace ERP.Common.TokenAuthentication
{
    public interface ITokenManager
    {
        bool Authenticate(string username, string password, Headers headers, ref User user,ref Token token);
        Token NewToken();
        bool VerifyToken(string token);
        bool Deactivate(string token);
        bool ClearTokenInMemory(string token);
    }
}