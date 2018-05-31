<?php
namespace AuthBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class SendMailController extends Controller
{

    /**
     * Высылает на почту код подтверждения
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Высылает на почту код подтверждения ",
     *  authentication=true,
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная смена пароля",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function sendMailAction(Request $request)
    {
        try {
            $confirmService = $this->get('auth.service.email_confirmation_service');


            $confirmUrl =  "{$request->getSchemeAndHttpHost()}/confirm-email?code=";

            $confirmService->generateConfirmation($confirmUrl);

        } catch(AccessDeniedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(\Exception $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getTrace());
        }

        return new JsonResponse([
            'confirmation_sended' => true,
        ]);

    }

    /**
     * Подтверждает почту по коду
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Сменить пароль",
     *  authentication=true,
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная смена пароля",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function confirmEmailByCodeAction($code, Request $request)
    {
        try {
            $confirmService = $this->get('auth.service.email_confirmation_service');

            $confirmUrl =  "{$request->getSchemeAndHttpHost()}/confirm-email?code=";

            $sended = $confirmService->activateCode($code, $confirmUrl);

            if($sended === 0) throw new \Exception("message not sended");

        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getTrace());
        }

        return new JsonResponse([
            'success' => true
        ]);

    }
}