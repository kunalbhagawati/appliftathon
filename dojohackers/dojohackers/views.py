from django.http import HttpResponse
from django.template import loader, RequestContext
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def index_view(request):
    """
    Initializes the app
    """

    template = loader.get_template('polls/index.html')
    context = RequestContext(request, {})
    return HttpResponse(template.render(context))
