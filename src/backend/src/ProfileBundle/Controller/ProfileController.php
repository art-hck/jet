<?php
namespace ProfileBundle\Controller;

use AppBundle\Http\ErrorResponse;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Exception\ProfilesLimitException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileController extends Controller
{
    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Создаем профиль",
     *     authentication=true,
     *     requirements={
     *          {
     *              "name" = "first_name",
     *              "dataType" = "string",
     *              "description" = "Имя"
     *          },
     *          {
     *              "name" = "last_name",
     *              "dataType" = "string",
     *              "description" = "Фамилия"
     *          },
     *          {
     *              "name" = "patronymic",
     *              "dataType" = "string",
     *              "description" = "Отчество"
     *          },
     *          {
     *              "name" = "alias",
     *              "dataType" = "string",
     *              "description" = "alias"
     *          },
     *          {
     *              "name" = "nickname",
     *              "dataType" = "string",
     *              "description" = "alias"
     *          },
     *          {
     *              "name" = "gender",
     *              "dataType" = "integer",
     *              "description" = "выберитье пол none- нет пола male- мужской  female-Женский"
     *          },
     *          {
     *              "name" = "birth_date",
     *              "dataType" = "datetime",
     *              "description" = "27-05-2017"
     *          }
     *
     *     }
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        $r = [];
        try {

            $profileService = $this->get('profile.service');

            $profile = $profileService->createProfileFromRequest($request, $this->getUser());
            $profileService->saveProfile($profile);

            $r = $profile->jsonSerialize();

        } catch(ProfilesLimitException $exception) {
            return new ErrorResponse($exception, Response::HTTP_FORBIDDEN);
        }
        catch(\Exception $e){
            $r['error'] = $e->getMessage();
        }

        return new JsonResponse([
            'entity' => $r
        ]);
    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Получаем профиль по id",
     *     requirements={
     *          {
     *              "name" = "id",
     *              "dataType" = "integer",
     *              "description" = "id профиля"
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function getProfileAction(Profile $profile)
    {
        return new JsonResponse([
            'entity' => $profile->jsonSerialize()
        ]);
    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Редактировать профиль",
     *     authentication=true,
     *     requirements={
     *          {
     *              "name" = "id",
     *          },
     *
     *          {
     *              "name" = "name",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "gender",
     *              "dataType" = "integer",
     *              "description" = "выберитье пол 0- нет пола 1- мужской  2-Женский"
     *          },
     *          {
     *              "name" = "birthDate",
     *              "dataType" = "datetime",
     *              "description" = "27-05-2017"
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function updateAction(Profile $profile)
    {

    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Получаем профиль по id",
     *     authentication=true,
     *     requirements={
     *          {
     *              "name" = "id",
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function deleteAction($id)
    {
        try {
            $profileService = $this->get('profile.service');

            $profile = $profileService->getProfileById($id);

            $profileService->deleteProfile($profile);

        } catch(NotFoundHttpException $e){

            return new JsonResponse([
                'error' => $e->getMessage()
            ], 404);
        }

        return new JsonResponse([
            'success' => $profile->jsonSerialize()
        ]);
    }
}