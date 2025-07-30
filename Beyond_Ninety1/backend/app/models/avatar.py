from tortoise import fields, models
from app.models.user import User

class Avatar(models.Model):
    id = fields.IntField(pk=True)
    user = fields.OneToOneField("models.User", related_name="avatar")
    speed = fields.IntField(default=50)
    endurance = fields.IntField(default=50)
    agility = fields.IntField(default=50)

    class Meta:
        table = "avatars"
