
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace CareerForgeAI.Routing;

public class ApiRoutePrefixConvention : IApplicationModelConvention
{
    private readonly AttributeRouteModel _prefix;

    public ApiRoutePrefixConvention(string prefix)
    {
        _prefix = new AttributeRouteModel(
            new RouteAttribute(prefix)
        );
    }

    public void Apply(ApplicationModel application)
    {
        foreach (var controller in application.Controllers)
        {
            // Apply the prefix only to API controllers.
            var isApiController = controller.Attributes
                .OfType<ApiControllerAttribute>()
                .Any();

            if (!isApiController)
                continue;

            foreach (var selector in controller.Selectors)
            {
                selector.AttributeRouteModel =
                    selector.AttributeRouteModel == null
                        ? _prefix
                        : AttributeRouteModel.CombineAttributeRouteModel(
                            _prefix,
                            selector.AttributeRouteModel
                        );
            }
        }
    }
}
